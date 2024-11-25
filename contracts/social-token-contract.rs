use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("CFv7S7oqqJNP24damGJA4XpHfSMJLzyhCSNjkRmXMjAe");

#[program]
pub mod social_token_platform {
    use super::*;

    // Create a custom creator token
    pub fn create_creator_token(
        ctx: Context<CreateCreatorToken>,
        symbol: String,
        initial_supply: u64,
    ) -> Result<()> {
        let token = &mut ctx.accounts.creator_token;
        let mint = &ctx.accounts.mint;

        require!(initial_supply > 0, CustomError::InvalidSupply);

        // Initialize token metadata
        token.authority = *ctx.accounts.creator.to_account_info().key;
        token.symbol = symbol.clone();
        token.supply = initial_supply;

        // Mint initial supply to creator's account
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: mint.to_account_info(),
                    to: ctx.accounts.creator_token_account.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            initial_supply,
        )?;
        emit!(CreatorTokenCreated {
            creator: *ctx.accounts.creator.to_account_info().key,
            symbol,
            initial_supply,
        });

        Ok(())
    }

    // Add liquidity for a creator token
    pub fn add_liquidity(
        ctx: Context<AddLiquidity>,
        token_amount: u64,
        usdt_amount: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.liquidity_pool;

        require!(
            token_amount > 0 && usdt_amount > 0,
            CustomError::InvalidLiquidityAmount
        );

        // Transfer creator tokens to the pool
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.creator_token_account.to_account_info(),
                    to: ctx.accounts.token_pool_account.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            token_amount,
        )?;

        // Transfer USDT to the pool
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.usdt_account.to_account_info(),
                    to: ctx.accounts.usdt_pool_account.to_account_info(),
                    authority: ctx.accounts.creator.to_account_info(),
                },
            ),
            usdt_amount,
        )?;

        // Update pool balances
        pool.creator_token_balance += token_amount;
        pool.usdt_balance += usdt_amount;

        emit!(LiquidityAdded {
            creator: *ctx.accounts.creator.to_account_info().key,
            token_amount,
            usdt_amount,
        });

        Ok(())
    }

    // Swap between USDT and creator tokens
    pub fn swap(ctx: Context<Swap>, amount: u64, is_buying: bool) -> Result<()> {
        let pool = &mut ctx.accounts.liquidity_pool;
        require!(amount > 0, CustomError::InvalidSwapAmount);

        if is_buying {
            // Buying creator tokens with USDT
            let price = calculate_price(pool.creator_token_balance, pool.usdt_balance, amount)?;
            require!(
                ctx.accounts.user_usdt_account.amount >= price,
                CustomError::InsufficientBalance
            );

            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    token::Transfer {
                        from: ctx.accounts.user_usdt_account.to_account_info(),
                        to: ctx.accounts.usdt_pool_account.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    },
                ),
                price,
            )?;

            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    token::Transfer {
                        from: ctx.accounts.token_pool_account.to_account_info(),
                        to: ctx.accounts.user_creator_token_account.to_account_info(),
                        authority: ctx.accounts.pool_authority.to_account_info(),
                    },
                ),
                amount,
            )?;
        } else {
            // Selling creator tokens for USDT
            let usdt_return =
                calculate_price(pool.usdt_balance, pool.creator_token_balance, amount)?;
            require!(
                ctx.accounts.user_creator_token_account.amount >= amount,
                CustomError::InsufficientBalance
            );

            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    token::Transfer {
                        from: ctx.accounts.user_creator_token_account.to_account_info(),
                        to: ctx.accounts.token_pool_account.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    },
                ),
                amount,
            )?;

            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    token::Transfer {
                        from: ctx.accounts.usdt_pool_account.to_account_info(),
                        to: ctx.accounts.user_usdt_account.to_account_info(),
                        authority: ctx.accounts.pool_authority.to_account_info(),
                    },
                ),
                usdt_return,
            )?;
        }

        Ok(())
    }
}

// AMM Price Calculation (Constant Product Formula)
pub fn calculate_price(pool_x: u64, pool_y: u64, dx: u64) -> Result<u64> {
    let dy = (pool_y * dx) / (pool_x + dx);
    require!(dy > 0, CustomError::InvalidPrice);
    Ok(dy)
}

// Account Data Structures
#[account]
pub struct CreatorToken {
    pub authority: Pubkey,
    pub symbol: String,
    pub supply: u64,
}

#[account]
pub struct LiquidityPool {
    pub creator: Pubkey,
    pub creator_token_balance: u64,
    pub usdt_balance: u64,
}

// Custom Errors
#[error_code]
pub enum CustomError {
    #[msg("Invalid supply amount.")]
    InvalidSupply,
    #[msg("Liquidity amount must be greater than zero.")]
    InvalidLiquidityAmount,
    #[msg("Swap amount must be greater than zero.")]
    InvalidSwapAmount,
    #[msg("Insufficient balance.")]
    InsufficientBalance,
    #[msg("Calculated price is invalid.")]
    InvalidPrice,
}

// Contexts
#[derive(Accounts)]
pub struct CreateCreatorToken<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 32 + 8)]
    pub creator_token: Account<'info, CreatorToken>,
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(init, payer = creator, mint::decimals = 6, mint::authority = creator)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub creator_token_account: Account<'info, TokenAccount>,
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct AddLiquidity<'info> {
    #[account(mut)]
    pub liquidity_pool: Account<'info, LiquidityPool>,
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub creator_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub token_pool_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub usdt_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub usdt_pool_account: Account<'info, TokenAccount>,
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub liquidity_pool: Account<'info, LiquidityPool>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_creator_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_usdt_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub token_pool_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub usdt_pool_account: Account<'info, TokenAccount>,
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub pool_authority: Signer<'info>,
}

// Events
#[event]
pub struct CreatorTokenCreated {
    pub creator: Pubkey,
    pub symbol: String,
    pub initial_supply: u64,
}

#[event]
pub struct LiquidityAdded {
    pub creator: Pubkey,
    pub token_amount: u64,
    pub usdt_amount: u64,
}
