import { Deserializable } from './Deserializable';

export class ImageInformation implements Deserializable {
    width: string;
    url: string;
    height: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
