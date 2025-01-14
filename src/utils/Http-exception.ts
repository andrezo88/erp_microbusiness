export class HttpException {
 status: number
 message: string
 detail: object | undefined
 constructor(status: number, message: string, detail?: object) {
  this.status = status
  this.message = message
  this.detail = detail || undefined
 }
}
