import { ShetlandWord } from '../../src/types';
const { getDb } = require('../db.ts');

export default class Word {
    async search(searchString: string): Promise<ShetlandWord[]> {
        const projection = {
            _id: 0,
            word: 1,
            example_sentence: 1,
            translation: 1,
            type: 1,
            see_also: 1,
            uuid: 1,
        };

        const regex = { $regex: `^${searchString}` };

        const searchOr = {
            $or: [
                { word: regex },
                { example_sentence: regex },
                { translation: regex },
                { see_also: regex },
            ],
        }

        const connection = await getDb()
            .collection("words")
            .find(searchOr)
            .project(projection)

        return connection
            .toArray(function (err: any, result: Array<any>) {

                if (err) {
                    return "Error fetching listings!";
                } else {
                    const payload = result
                        .map(word => ({
                            ...word,
                            see_also: word.see_also.split(',')
                        }))
                        console.log("payload", payload);
                    return payload;
                }
            });
    }
}