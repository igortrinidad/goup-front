const UUID = require('uuid-js')

export default {
    id: UUID.create().toString(),
    type_id: '',
    title: '',
    prep_time: 0,
    portion_size: '',
    portions: 0,
    difficulty: 0,
    prep_description: '',
    ingredients: [],
    kcal: 0,
    protein: 0,
    carbohydrate: 0,
    lipids: 0,
    fiber: 0,
    video_url: '',

    //Relationships
    types: [],
    photos: [],
    comments: [],
    tags: [],
    ratings:[]
}

export function cleanMealRecipe() {
    return {
        id: UUID.create().toString(),
        type_id: '',
        title: '',
        prep_time: 0,
        portion_size: '',
        portions: 0,
        difficulty: 0,
        prep_description: '',
        ingredients: [],
        kcal: 0,
        protein: 0,
        carbohydrate: 0,
        lipids: 0,
        fiber: 0,
        video_url: '',

        //Relationships
        types: [],
        photos: [],
        comments: [],
        tags: [],
        ratings:[]
    }

}
