import { Deserializable } from './Deserializable';
import { imageInformation } from './imageInformation';

export class Song implements Deserializable{

    artist: string;
    album: string;
    imageInformation: Array<imageInformation>;
    upVotes: number;
    track: string;
    trackUID: string;
    downVotes: number; 


    deserialize(input: any): this {
       Object.assign(this, input);
       return this;
    }

}