import { Deserializable } from './Deserializable';
import { ImageInformation } from './ImageInformation';

export class Song implements Deserializable {

    artist: string;
    album: string;
    imageInformation: Array<ImageInformation>;
    upVotes: number;
    track: string;
    trackUID: string;
    downVotes: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
