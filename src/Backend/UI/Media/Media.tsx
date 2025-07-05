import React, { useMemo } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import IconButton from "@mui/material/IconButton";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  DomainKey,
  normalizeUrl,
  resolveDomainKeyFromProps,
  getDomainUrl,
} from "../../utils/domain";
import clsx from "clsx";

interface SequenceConfig {
  base: string;
  start: number;
  end: number;
  ext?: string;
  leadingZeros?: number;
  pattern?: string;
}

type MediaEntry = string | { sequence: SequenceConfig };

interface MediaProps extends Record<string, any> {
  poster?: string;
  src?: string | string[];
  sequence?: SequenceConfig | SequenceConfig[];
  media?: MediaEntry[];
  alt?: string;
  domainKey?: DomainKey;
  customDomain?: string;
  sort?: boolean;
  responsive?: boolean;
  groupImg?: boolean;
  movie?: boolean;
}

const padNumber = (num: number, width: number): string =>
  num.toString().padStart(width, "0");

const generateSequenceUrls = (
  config: SequenceConfig,
  domain: string
): string[] => {
  const { base, start, end, ext = "png", leadingZeros = 0, pattern } = config;
  const list: string[] = [];

  for (let i = start; i <= end; i++) {
    const n = leadingZeros > 0 ? padNumber(i, leadingZeros) : i.toString();
    const filename = pattern ? pattern.replace("${n}", n) : `${n}.${ext}`;
    list.push(normalizeUrl(`${base}${filename}`, domain));
  }

  return list;
};

const getExtension = (url: string): string => {
  try {
    const clean = url.split(/[?#]/)[0];
    return clean.slice(((clean.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  } catch {
    return "";
  }
};

const isYouTubeLink = (url: string) =>
  /(youtube\.com\/(watch\?v=|shorts\/|live\/)|youtu\.be\/)/.test(url);

const isAudio = (file: string) => {
  const ext = getExtension(file);
  return ["mp3", "wav", "ogg"].includes(ext);
};

const isVideo = (file: string) => {
  const ext = getExtension(file);
  return ["mp4", "webm", "ogg"].includes(ext) && !isAudio(file);
};

const Media: React.FC<MediaProps> = (props) => {
  const {
    media,
    src,
    sequence,
    alt = "Media content",
    poster,
    domainKey: directKey,
    customDomain,
    sort = false,
    responsive = false,
    groupImg = false,
    movie = false,
  } = props;

  const resolvedKey = resolveDomainKeyFromProps(props) || directKey;

  if (customDomain && resolvedKey) {
    return (
      <div className="card p-4 border-error-200 bg-error-50 text-error-700 mb-6">
        ❌ Error: Use only one of `customDomain` or a boolean domain flag like
        `a`, `b`, `c`.
      </div>
    );
  }

  const baseDomain = useMemo(() => {
    return getDomainUrl(resolvedKey, customDomain);
  }, [resolvedKey, customDomain]);

  const mediaArray = useMemo(() => {
    let list: string[] = [];

    const fromMedia =
      media?.flatMap((entry) => {
        if (typeof entry === "string") {
          return [normalizeUrl(entry, baseDomain)];
        } else if ("sequence" in entry) {
          return generateSequenceUrls(entry.sequence, baseDomain);
        }
        return [];
      }) ?? [];

    const fromSrc = Array.isArray(src) ? src : src ? [src] : [];
    const fromSeq = sequence
      ? Array.isArray(sequence)
        ? sequence
        : [sequence]
      : [];

    const fromSrcUrls = fromSrc.map((url) => normalizeUrl(url, baseDomain));
    const fromSeqUrls = fromSeq.flatMap((conf) =>
      generateSequenceUrls(conf, baseDomain)
    );

    list = [...fromMedia, ...fromSrcUrls, ...fromSeqUrls];
    return sort ? list.sort() : list;
  }, [media, src, sequence, baseDomain, sort]);

  const images = mediaArray.filter(
    (file) => !isVideo(file) && !isAudio(file) && !isYouTubeLink(file)
  );
  const videos = mediaArray.filter(isVideo);
  const audios = mediaArray.filter(isAudio);
  const youtubeVideos = mediaArray.filter(isYouTubeLink);

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      let videoId = "";

      if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1]?.split(/[&#]/)[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
      } else if (url.includes("youtube.com/shorts/")) {
        videoId = url.split("/shorts/")[1]?.split(/[?#]/)[0];
      } else if (url.includes("youtube.com/live/")) {
        videoId = url.split("/live/")[1]?.split(/[?#]/)[0];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  const containerClasses = clsx(
    "mb-6",
    responsive && "lg:w-1/2",
    groupImg && !responsive && "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
  );

  const mediaWrapperClasses = "card overflow-hidden cursor-pointer transition-transform hover:scale-105 mb-4";

  return (
    <div className={containerClasses}>
      {/* Videos */}
      {videos.map((videoSrc, index) => (
        <div className={mediaWrapperClasses} key={`video-${index}`}>
          <video
            src={videoSrc}
            poster={poster}
            controls
            crossOrigin="anonymous"
            preload="metadata"
            className={clsx("w-full h-auto", movie && "aspect-video object-contain bg-black")}
          />
        </div>
      ))}

      {/* YouTube */}
      {youtubeVideos.map((ytSrc, index) => (
        <div className={mediaWrapperClasses} key={`yt-${index}`}>
          <div className="relative w-full aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(ytSrc)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
              title={`youtube-video-${index}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      ))}

      {/* Audios */}
      {audios.map((audioSrc, index) => (
        <div className={`${mediaWrapperClasses} p-4`} key={`audio-${index}`}>
          <audio
            src={audioSrc}
            controls
            crossOrigin="anonymous"
            preload="metadata"
            className="w-full"
          />
        </div>
      ))}

      {/* Images */}
      {images.length > 0 && (
        <PhotoProvider
          toolbarRender={({ rotate, scale, onScale, onRotate }) => (
            <>
              <IconButton
                onClick={() => onRotate(rotate + 90)}
                style={{ color: "white" }}
                className="PhotoView-Slider__toolbarIcon"
              >
                <RotateRightIcon />
              </IconButton>
              <IconButton
                onClick={() => onScale(scale + 0.2)}
                style={{ color: "white" }}
                className="PhotoView-Slider__toolbarIcon"
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                onClick={() => onScale(scale - 0.2)}
                style={{ color: "white" }}
                className="PhotoView-Slider__toolbarIcon"
              >
                <ZoomOutIcon />
              </IconButton>
            </>
          )}
        >
          <div className={groupImg ? "break-inside-avoid" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {images.map((imgSrc, index) => (
              <div
                className={clsx(
                  mediaWrapperClasses,
                  groupImg && "break-inside-avoid mb-4"
                )}
                key={`image-${index}`}
              >
                <PhotoView src={imgSrc}>
                  <img
                    src={imgSrc}
                    alt={alt}
                    loading="lazy"
                    className={clsx(
                      "w-full h-auto object-cover",
                      movie && "aspect-video object-contain bg-black"
                    )}
                  />
                </PhotoView>
              </div>
            ))}
          </div>
        </PhotoProvider>
      )}
    </div>
  );
};

export default Media;