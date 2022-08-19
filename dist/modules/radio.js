"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistUrl = exports.RadioChannels = void 0;
const axios_1 = __importDefault(require("axios"));
exports.RadioChannels = [
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
async function getPlaylistUrl(url) {
    if (url.endsWith(".m3u8")) {
        return url;
    }
    else {
        let playlistUrl = await (0, axios_1.default)(url).then((res) => res.data);
        if (url.endsWith(".pls")) {
            playlistUrl = playlistUrl.split("File1=")[1].split("\n")[0];
        }
        return playlistUrl;
    }
}
exports.getPlaylistUrl = getPlaylistUrl;
