import config from '@/config'
import { CreatePost, EditPost, Home, Post } from '@/pages'
import MuiLayout from '@/Layouts/MuiLayout'

const routes = [
  {
    path: config.routes.home,
    component: Home,
    layout: MuiLayout,
  },
  {
    path: config.routes.postDetail,
    component: Post,
    layout: MuiLayout,
  },
  {
    path: config.routes.createPost,
    component: CreatePost,
    layout: MuiLayout,
  },
  {
    path: config.routes.editPost,
    component: EditPost,
    layout: MuiLayout,
  },
]

export default routes
