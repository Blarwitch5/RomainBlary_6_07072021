import Image from "./image.js";
import Video from "./video.js";

export default class Media {
  // Check if the selected item is an image or a video
  renderMedia(media) {
    let factory = null;
    if (media.hasOwnProperty("image")) {
      factory = new Image();
    } else if (media.hasOwnProperty("video")) {
      factory = new Video();
    }
    return factory.buildHtml(media);
  }
}
