console.info(2)

import('./async1').then(m => console.info('async-2', m))

export default {}
