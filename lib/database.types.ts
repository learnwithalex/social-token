export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      creators: {
        Row: {
          id: string
          name: string
          handle: string
          avatar_url: string
          bio: string
          followers_count: number
          following_count: number
          token_price: number
          market_cap: number
          volume_24h: number
          categories: string[]
          created_at: string
          wallet_address: string
        }
        Insert: {
          id?: string
          name: string
          handle: string
          avatar_url: string
          bio: string
          followers_count?: number
          following_count?: number
          token_price?: number
          market_cap?: number
          volume_24h?: number
          categories?: string[]
          created_at?: string
          wallet_address: string
        }
        Update: {
          id?: string
          name?: string
          handle?: string
          avatar_url?: string
          bio?: string
          followers_count?: number
          following_count?: number
          token_price?: number
          market_cap?: number
          volume_24h?: number
          categories?: string[]
          created_at?: string
          wallet_address?: string
        }
      }
      tokens: {
        Row: {
          id: string
          creator_id: string
          symbol: string
          name: string
          initial_supply: number
          current_supply: number
          price: number
          market_cap: number
          volume_24h: number
          created_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          symbol: string
          name: string
          initial_supply: number
          current_supply?: number
          price?: number
          market_cap?: number
          volume_24h?: number
          created_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          symbol?: string
          name?: string
          initial_supply?: number
          current_supply?: number
          price?: number
          market_cap?: number
          volume_24h?: number
          created_at?: string
        }
      }
      token_holders: {
        Row: {
          id: string
          token_id: string
          holder_address: string
          balance: number
          created_at: string
        }
        Insert: {
          id?: string
          token_id: string
          holder_address: string
          balance: number
          created_at?: string
        }
        Update: {
          id?: string
          token_id?: string
          holder_address?: string
          balance?: number
          created_at?: string
        }
      }
      trades: {
        Row: {
          id: string
          token_id: string
          trader_address: string
          type: 'buy' | 'sell'
          amount: number
          price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          token_id: string
          trader_address: string
          type: 'buy' | 'sell'
          amount: number
          price: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          token_id?: string
          trader_address?: string
          type?: 'buy' | 'sell'
          amount?: number
          price?: number
          total?: number
          created_at?: string
        }
      }
      liquidity_pools: {
        Row: {
          id: string
          token_id: string
          paired_token: string
          total_liquidity: number
          token_amount: number
          paired_amount: number
          apr: number
          created_at: string
        }
        Insert: {
          id?: string
          token_id: string
          paired_token: string
          total_liquidity: number
          token_amount: number
          paired_amount: number
          apr?: number
          created_at?: string
        }
        Update: {
          id?: string
          token_id?: string
          paired_token?: string
          total_liquidity?: number
          token_amount?: number
          paired_amount?: number
          apr?: number
          created_at?: string
        }
      }
      exclusive_content: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string
          type: 'event' | 'merch' | 'nft' | 'membership'
          price: number
          token_requirement: number
          image_url: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description: string
          type: 'event' | 'merch' | 'nft' | 'membership'
          price: number
          token_requirement: number
          image_url: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string
          type?: 'event' | 'merch' | 'nft' | 'membership'
          price?: number
          token_requirement?: number
          image_url?: string
          details?: Json
          created_at?: string
        }
      }
    }
  }
}