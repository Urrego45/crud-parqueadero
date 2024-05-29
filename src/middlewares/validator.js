export const validateSchema = (schema) => (req, res, next) => {
    console.log(req.body);
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors.map((error) => error.message))
    }
}
