import cors from 'cors'

const allowedOrigins = [
    'http://localhost:3000',
    'https://www.dandrepairshop.com',
    'https://dandrepairshop.com'
]

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

export default allowedOrigins