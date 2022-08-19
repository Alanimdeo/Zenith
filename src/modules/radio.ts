import axios from "axios";

export const RadioChannels = [
  {
    name: "KBS Classic FM",
    value: "http://serpent0.duckdns.org:8088/kbsfm.pls",
  },
  {
    name: "KBS Cool FM",
    value: "http://serpent0.duckdns.org:8088/kbs2fm.pls",
  },
  {
    name: "KBS 1라디오",
    value: "http://serpent0.duckdns.org:8088/kbs1radio.pls",
  },
  {
    name: "KBS Happy FM(2라디오)",
    value: "http://serpent0.duckdns.org:8088/kbs2radio.pls",
  },
  {
    name: "MBC 표준FM",
    value: "http://serpent0.duckdns.org:8088/mbcsfm.pls",
  },
  {
    name: "MBC FM4U",
    value: "http://serpent0.duckdns.org:8088/mbcfm.pls",
  },
  {
    name: "SBS POWER FM",
    value: "http://serpent0.duckdns.org:8088/sbsfm.pls",
  },
  {
    name: "SBS LOVE FM",
    value: "http://serpent0.duckdns.org:8088/sbs2fm.pls",
  },
  {
    name: "EBS FM",
    value: "http://ebsonair.ebs.co.kr/fmradiofamilypc/familypc1m/playlist.m3u8",
  },
];

export async function getPlaylistUrl(url: string): Promise<string> {
  if (url.endsWith(".m3u8")) {
    return url;
  } else {
    let playlistUrl: string = await axios(url).then((res) => res.data);
    if (url.endsWith(".pls")) {
      playlistUrl = playlistUrl.split("File1=")[1].split("\n")[0];
    }
    return playlistUrl;
  }
}
