import Vika from "@vikadata/vika";
import { VIKA_TOKEN } from "../../config";

const vika = new Vika({ token: VIKA_TOKEN });

export default vika;