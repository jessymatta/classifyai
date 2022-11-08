export interface UserDetails {
    id:number,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    dob?: string,
    profile_pic_url?:string,
    is_deleted:boolean,
    role_id: number,
    created_at: string,
    updated_at: string
}