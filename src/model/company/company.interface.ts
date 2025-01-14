export interface ICompanyRequest {
 name: string
 email: string
 password: string
 document: string
}

export interface ICompanyResponse {
 _id: string
 name: string
 email: string
 document: string
 user: string | null
}