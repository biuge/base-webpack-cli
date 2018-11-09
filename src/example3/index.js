import hello from './hello'
// import hello from '@/common/hello'
import '@/common/style.css'

document.getElementById('root').appendChild(hello)
// import(/* webpackChunkName: "lodash" */ 'lodash').then(m => console.info('3-lodash', m))
// import(/* webpackChunkName: "hello3" */ './hello').then(m => console.info('3-hello', m))
// import(/* webpackChunkName: "axios" */ 'axios').then(m => console.info('3-axios', m))
// import(/* webpackChunkName: "jquery" */ 'jquery').then(m => console.info('3-jquery', m))
// import(/* webpackChunkName: "axios" */ '@/example2/hello').then(m => console.info('common', m))
// import(/* webpackChunkName: "axios" */ '@/common/hello').then(m => console.info('common', m))
// import('@/common/async2').then(m => {})
