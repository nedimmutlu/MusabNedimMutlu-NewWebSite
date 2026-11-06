import videosData from './videos.json';
import type { VideoCategory, VideoKind, VideoOrientation, VideoWork } from './types';

export type { VideoCategory, VideoKind, VideoOrientation, VideoWork };

export const videos = videosData as VideoWork[];
export const showreel =
  videos.find((video) => video.kind === 'showreel' && video.published !== false) ?? videos[0];
export const works = videos.filter((video) => video.kind === 'work' && video.published !== false);
