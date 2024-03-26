import { nodeCache } from '../src/deps.js'

export const cache = new nodeCache({stdTTl: 60*15})

const verifyCache = (req, res, next) => {
    try {
        const { id } = req.params;
        if (cache.get(id) !== undefined){
            return res.json(cache.get(id))
        }
        return next()
    } catch (error) {
        console.log("hello");
        res.send({error: error})
    }
}

export default verifyCache