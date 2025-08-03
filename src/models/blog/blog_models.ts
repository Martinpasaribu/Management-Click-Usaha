export interface Comment {
  user: string
  message: string
  date: string // ISO string, karena di client waktu biasanya pakai string
}

export interface Author {
  _id : string,
  name : string,
  bio : string,
  email : string,
  images : string,

}
export interface Blog {
  _id: string // primitive.ObjectID diubah jadi string
  title: string
  desc: string
  sub_desc: string
  slug: string
  content: string
  comment: Comment[]
  view: number
  status: string
  image_bg: string
  images: string[]
  category: string
  tags: string[]
  author: Author
  createdAt: string // ISO date
  updatedAt: string
}
