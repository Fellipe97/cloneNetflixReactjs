const APU_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b';
const API_BASE = 'https://api.themoviedb.org/3';


/*
- originais da netflix
- recomendados  (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários
*/


export default{
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                
            }
        ];
    }

}