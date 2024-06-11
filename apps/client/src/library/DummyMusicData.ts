import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

export interface TrackMetadata {
  album: string;
  albumArtist: string;
  artistName: string;
  bpm: string;
  comment: string;
  composer: string;
  discNumber: string;
  duration: string;
  filename: string;
  fileType: string;
  genre: string;
  trackName: string;
  trackNumber: string;
  year: string;
}

export const tracks: TrackMetadata[] = [{
  filename: 'Fight Scene - Mixdown A - MAX.wav',
  fileType: 'wav',
  trackName: 'Fight Scene',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '5',
  genre: 'Cinematic Orchestral',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '104',
  duration: '0:52'
},
{
  filename: 'David Mieloch - Sonata No.1 - Orchestra 2001.mp3',
  fileType: 'mp3',
  trackName: 'Sonata No.1',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '3',
  genre: 'String Orchestra',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '96',
  duration: '6:00'
},
{
  filename: 'David Mieloch - Where Roads End - Link Ensemble Performance.mp3',
  fileType: 'mp3',
  trackName: 'Where Roads End',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '4',
  genre: 'Chamber Ensemble',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '114',
  duration: '6:41'
},
{
  filename: 'Infinity F Ozone.wav',
  fileType: 'wav',
  trackName: 'Infinity',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '7',
  genre: 'Video Game Music',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '150',
  duration: '3:44'
},
{
  filename: '03 - Identity Conflict Z - High Rez.mp3',
  fileType: 'mp3',
  trackName: 'Identity Conflict Z',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '1',
  genre: 'Chamber Ensemble',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '158',
  duration: '5:46'
},
{
  filename: 'Casual Game Music- F - 110bpm - Mastered.wav',
  fileType: 'wav',
  trackName: 'Casual Game Music',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '2',
  genre: 'Electronic',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '110',
  duration: '1:18'
},
{
  filename: 'Glaxos Onedot.wav',
  fileType: 'wav',
  trackName: 'Glaxos Onedot',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '6',
  genre: 'Cinematic Orchestral',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '92',
  duration: '1:22'
},

{
  filename: 'Merry Melony 2 Draft Intro.mp3',
  fileType: 'mp3',
  trackName: 'Merry Melony 2 Draft Intro',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '8',
  genre: 'Soundtrack',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '116',
  duration: '1:10'
},
{
  filename: 'Organica - Performed By Ann Fontanella.mp3',
  fileType: 'mp3',
  trackName: 'Organica',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '9',
  genre: 'Violin Solo',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '98',
  duration: '7:28'
},
{
  filename: 'Prj Oblvion Intro Demo.mp3',
  fileType: 'mp3',
  trackName: 'Project Oblivion Intro',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '10',
  genre: 'Glitch Electronic',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '98',
  duration: '1:17'
},
{
  filename: 'Virtue Itself Is Harmony.wav',
  fileType: 'wav',
  trackName: 'Virtue Itself Is Harmony',
  artistName: 'David Mieloch',
  album: 'Unknown Album',
  trackNumber: '11',
  genre: 'Chamber Ensemble',
  year: '2024',
  comment: '',
  composer: 'David Mieloch',
  albumArtist: 'David Mieloch',
  discNumber: '1',
  bpm: '110',
  duration: '6:45'
}
];

const openai = new OpenAI({
  apiKey: 'xxxxx-xxxxxxxxx-xxxxx-xxxxx-xxxxx',
  dangerouslyAllowBrowser: true,
});


export interface Comment {
  id: string;
  timeStart: number;
  timeEnd: number;
  text: string;
  label: string;
}

async function generateComments(track: TrackMetadata): Promise<Comment[]> {
  const durationInSeconds = convertDurationToSeconds(track.duration);
  const numberOfComments = Math.min(Math.floor(durationInSeconds / 10), 5); // Generate up to 5 comments per track
  const comments: Comment[] = [];
  const usedTimes = new Set<number>();

  for (let i = 0; i < numberOfComments; i++) {
    let timeStart;
    do {
      timeStart = getRandomInt(0, durationInSeconds - 10);
    } while (usedTimes.has(timeStart));

    const timeEnd = timeStart + 10;
    usedTimes.add(timeStart);

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: `You are a vice president of music licensing for film and tv. Please write a musical feedback for the composer to fix in comment based on the metadata provided. Be concise and assume the metadata itself is already visible to see on the page, no need to repeat it. Limit the feedback to 1 to 3 sentences. Context: ${JSON.stringify(track)}` }],
      model: 'gpt-3.5-turbo',
    };

    const response = await openai.chat.completions.create(params);

    const text = response.choices[0].message.content || "No feedback provided";

    comments.push({
      id: uuidv4(),
      timeStart,
      timeEnd,
      text,
      label: `Feedback ${i + 1}`,
    });
  }

  return comments;
}

function convertDurationToSeconds(duration: string): number {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function generateCommentsForAllTracks(tracks: TrackMetadata[]): Promise<{ [filename: string]: Comment[] }> {
  const allComments: { [filename: string]: Comment[] } = {};

  for (const track of tracks) {
    allComments[track.filename] = await generateComments(track);
  }

  return allComments;
}

export const mockComments: { [filename: string]: Comment[] } = {
  "03 - Identity Conflict Z - High Rez.mp3": [
    {
      "id": "1ef521f7-0ce4-4707-8dad-b9cc335a1ed5",
      "timeStart": 90,
      "timeEnd": 100,
      "text": "The composition is well crafted and emotive, but consider toning down the intensity at certain points to avoid overwhelming the scene. Additionally, adding some subtle variation in instrumentation could enhance the overall dynamics of the piece.",
      "label": "A"
    },
    {
      "id": "b7db8436-b2a5-4994-9817-7c84a883c6e8",
      "timeStart": 104,
      "timeEnd": 114,
      "text": "The composition is well-structured and emotive, but the tempo at 158 bpm feels too rushed for the intended scene of identity conflict. Please consider slowing down the tempo to better allow for the tension and complexity to be fully explored and conveyed.",
      "label": "B"
    },
    {
      "id": "bc67f095-c070-4ced-8509-5c0b6911e1fc",
      "timeStart": 122,
      "timeEnd": 132,
      "text": "The composition effectively conveys tension and conflict, but the overall pacing feels rushed and could benefit from more dynamic variation. Consider incorporating more subtle shifts in intensity to better support the emotional arc of the scene.",
      "label": "C"
    },
    {
      "id": "68b40cbc-77ce-4ce8-9474-e102ee66b1b3",
      "timeStart": 205,
      "timeEnd": 215,
      "text": "The track \"Identity Conflict Z\" has a BPM of 158, but the pacing feels too slow for the genre. Please consider increasing the tempo for a more dynamic feel.",
      "label": "D"
    },
    {
      "id": "c3d09645-31ed-4e35-8100-cdfc2172faf7",
      "timeStart": 270,
      "timeEnd": 280,
      "text": "The track \"Identity Conflict Z\" needs to be re-mixed to balance the levels of the chamber ensemble instruments for a more cohesive sound. Additionally, consider adding more dynamic variation to enhance the emotional impact of the composition.",
      "label": "E"
    }
  ],
  "Casual Game Music- F - 110bpm - Mastered.wav": [
    {
      "id": "5966a379-aeca-4052-be9f-fa02d1480b0d",
      "timeStart": 16,
      "timeEnd": 26,
      "text": "The composition is well suited for a casual game with its upbeat tempo and electronic genre. However, consider adding more dynamic changes to enhance the overall listening experience.",
      "label": "A"
    },
    {
      "id": "1db0327e-19e3-44ef-82cd-5841991cb5fb",
      "timeStart": 29,
      "timeEnd": 39,
      "text": "Please increase the dynamic range and add more variety in instrumentation to keep the listener engaged throughout the duration of the track. Consider incorporating more melodic elements to enhance the overall feel of the piece.",
      "label": "B"
    },
    {
      "id": "19857e09-19fe-44a9-8cfb-257e7d003d9d",
      "timeStart": 40,
      "timeEnd": 50,
      "text": "The upbeat tempo and electronic genre work well for a casual game, but consider adding more dynamic changes and variations to keep the piece engaging throughout. Also, explore adding in some unique sounds or instruments to make the music more memorable and stand out to listeners.",
      "label": "C"
    },
    {
      "id": "800b9838-a82a-4035-8fa9-7325671950b1",
      "timeStart": 51,
      "timeEnd": 61,
      "text": "The overall energy and mood of the track may not fully match the casual game genre. Consider adding more playful and upbeat elements to better fit the intended context.",
      "label": "D"
    },
    {
      "id": "8628f788-93c3-4922-994a-8cd67aec4f80",
      "timeStart": 63,
      "timeEnd": 74,
      "text": "The composition is engaging and aligns well with the casual game genre. However, please consider adding variation in the melody or rhythm to prevent monotony throughout the track. Additionally, ensure that the mastering does not overpower the overall mix.",
      "label": "E"
    }
  ],
  "David Mieloch - Sonata No.1 - Orchestra 2001.mp3": [
    {
      "id": "1b0f62f4-d0a5-4afa-b9d2-be59d6a8c865",
      "timeStart": 68,
      "timeEnd": 78,
      "text": "Please add more dynamic contrast and variation in orchestration to enhance the emotional impact of the piece. Consider incorporating elements of tension and release to create a more engaging listening experience.",
      "label": "A"
    },
    {
      "id": "f9261db5-2da8-4eb4-a72b-280dd5e2dee2",
      "timeStart": 80,
      "timeEnd": 110,
      "text": "The composition is well structured and harmonically rich. However, consider adding more dynamic contrasts and varying textures to create a more captivating listening experience for film and tv placements.",
      "label": "B"
    },
    {
      "id": "f6280ecc-e7fb-46ea-8a72-6df07057269c",
      "timeStart": 217,
      "timeEnd": 227,
      "text": "The composition is well structured and engaging, but consider adding more dynamic contrast and variation in instrumentation to keep the listener's interest throughout the 6-minute duration.",
      "label": "C"
    },
    {
      "id": "0ef3bd08-43cf-4645-8692-6b152278bce8",
      "timeStart": 232,
      "timeEnd": 262,
      "text": "The composition lacks dynamic contrast and could benefit from more varied instrumentation to create a more engaging listening experience. Consider incorporating different textures and timbres to enhance the overall emotional impact of the piece.",
      "label": "D"
    },
    {
      "id": "2b190e32-0c07-47fc-a8b5-040baa1f874f",
      "timeStart": 310,
      "timeEnd": 320,
      "text": "Great job on the composition, David! However, please consider adding more dynamic contrast and variation in the orchestration to keep the listener engaged throughout the 6-minute duration. Also, be mindful of the tempo at 96 bpm, as it can sometimes feel stagnant without enough rhythmic interest.",
      "label": "E"
    }
  ],
  "David Mieloch - Where Roads End - Link Ensemble Performance.mp3": [
    {
      "id": "c00d43e1-ba22-48b3-a1e4-3635097ceac4",
      "timeStart": 31,
      "timeEnd": 41,
      "text": "Great job on the composition, David! The only feedback is to consider adding more dynamic changes and variations in instrumentation to keep the listener engaged throughout the 6:41 duration. Keep up the great work!",
      "label": "A"
    },
    {
      "id": "c5dd6b35-998f-4894-952e-9195e54cafbc",
      "timeStart": 111,
      "timeEnd": 121,
      "text": "Great job on \"Where Roads End\" by David Mieloch. The only feedback I have is to consider adding some variations in dynamics to create more contrast throughout the piece. Keep up the good work!",
      "label": "B"
    },
    {
      "id": "3584a9f2-66d1-458a-a714-90af497a951d",
      "timeStart": 239,
      "timeEnd": 249,
      "text": "The composition is beautiful but the intensity may be too high for some scenes. Please consider creating a more calming variation for potential use in reflective moments.",
      "label": "C"
    },
    {
      "id": "254c05a0-a529-406e-8bfe-1b6a51baddff",
      "timeStart": 310,
      "timeEnd": 320,
      "text": "Please adjust the tempo to match the intended bpm of 114 for better synchronization with the visuals. Consider adding more dynamic changes to elevate the emotional impact of the composition.",
      "label": "D"
    },
    {
      "id": "379f9f57-1a0e-4110-ac00-a699d231d0c6",
      "timeStart": 327,
      "timeEnd": 337,
      "text": "The composition is well-crafted and rich in dynamics, but there are moments where the strings overpower the rest of the ensemble. Please work on balancing the different sections to ensure each instrument can be heard clearly throughout the piece. Additionally, consider adding more variation in the rhythmic patterns to keep the listener engaged.",
      "label": "E"
    }
  ],
  "Fight Scene - Mixdown A - MAX.wav": [
    {
      "id": "15f94f6b-a213-47f2-8cde-d34c4d1d19bc",
      "timeStart": 8,
      "timeEnd": 18,
      "text": "Please add more dynamic range and intensity to enhance the impact of the fight scene. Consider incorporating percussion elements to drive the action forward.",
      "label": "A"
    },
    {
      "id": "f39f8afd-7be2-4dd3-917d-e25eea9ff387",
      "timeStart": 22,
      "timeEnd": 32,
      "text": "The intensity of the fight scene would benefit from an increase in tempo or a more dynamic orchestration to heighten the drama and action. Consider adding more variations in instrumentation to create a more dynamic and engaging soundtrack.",
      "label": "B"
    },
    {
      "id": "62843277-614d-4a4b-b32c-a8e19bae06f5",
      "timeStart": 35,
      "timeEnd": 56,
      "text": "The fight scene composition needs to be more dynamic and intense to better match the genre and BPM indicated in the metadata. Consider adding stronger percussion and brass elements to heighten the energy of the scene.",
      "label": "C"
    },
  ],
  "Glaxos Onedot.wav": [
    {
      "id": "a1f8db54-5885-4cb4-b3a3-040589ac2ae6",
      "timeStart": 24,
      "timeEnd": 34,
      "text": "The composition works well for a cinematic orchestral piece, but consider adding more dynamic range and variation to create more emotional impact throughout the track. Additionally, consider extending the duration slightly to allow for more development and build-up.",
      "label": "A"
    },
    {
      "id": "c6d66ed0-f517-4d3f-9c72-ff5d3dff43c9",
      "timeStart": 42,
      "timeEnd": 64,
      "text": "The orchestration feels a bit cluttered in some sections, consider simplifying the arrangement to allow the main theme to shine through. The strings could use a more dynamic range to add depth and emotion to the piece. Overall, the tempo and duration are fitting for a cinematic context.",
      "label": "B"
    },
    {
      "id": "ca2e8ba6-d890-4961-8851-961bf426de1e",
      "timeStart": 66,
      "timeEnd": 78,
      "text": "The overall composition of \"Glaxos Onedot\" is strong, but the dynamics could be more pronounced to enhance the cinematic feel. Consider layering in some additional instrumentation to add depth to the sound. Also, ensure that the pacing aligns with the intended 92 BPM tempo for optimal synchronization with visual cues in film and TV.",
      "label": "C"
    },
  ],
  "Infinity F Ozone.wav": [
    {
      "id": "e7b0ad3f-10c4-40fe-9509-6db806fde207",
      "timeStart": 22,
      "timeEnd": 32,
      "text": "The composition is well-suited for a video game, but it lacks a dynamic buildup and resolution. Consider adding more variation in instrumentation and melodies to engage the listener throughout the track. Additionally, the BPM of 150 may be too fast for certain scenes, so consider slowing it down for more versatility in licensing placements.",
      "label": "A"
    },
    {
      "id": "6027327f-3127-406b-8239-e1f44c44f3dc",
      "timeStart": 46,
      "timeEnd": 62,
      "text": "Please add more dynamic range and variation to the composition to better fit the evolving narrative of a film or TV show. Consider incorporating different instrumentation or chord progressions to add depth and interest to the overall sound.",
      "label": "B"
    },
    {
      "id": "a0deeafc-da60-44bd-9aa2-8d9bd90ff95a",
      "timeStart": 139,
      "timeEnd": 149,
      "text": "The track \"Infinity\" by David Mieloch has a great energy and fits well in the video game music genre. However, there are a few sections where the transitions could be smoother to enhance the overall flow of the composition.",
      "label": "C"
    },
    {
      "id": "b67f5f0c-7c3e-49ed-bbf5-3dc90584f3f8",
      "timeStart": 160,
      "timeEnd": 172,
      "text": "The overall mood and atmosphere of the track are well-suited for a video game, but it lacks a strong enough melody to really stand out. Consider adding a more memorable hook to make the piece more engaging for listeners.",
      "label": "D"
    },
    {
      "id": "4cc1a193-fc22-4dde-8290-b9854f4cdfcf",
      "timeStart": 182,
      "timeEnd": 211,
      "text": "The track \"Infinity\" by David Mieloch has potential, but the overall energy and instrumentation could be enhanced to better fit in the Video Game Music genre. Consider adding more dynamic elements to keep listeners engaged throughout the 3:44 duration.",
      "label": "E"
    }
  ],
  "Merry Melony 2 Draft Intro.mp3": [
    {
      "id": "2f066e8b-d1bc-4247-975e-9282a84ec18e",
      "timeStart": 12,
      "timeEnd": 22,
      "text": "The intro lacks a strong thematic hook to grab the audience's attention. Consider adding more dynamic shifts or melodic motifs to create a more engaging opening.",
      "label": "A"
    },
    {
      "id": "82addbd3-1127-4d6e-826f-ec66c605ef4d",
      "timeStart": 41,
      "timeEnd": 51,
      "text": "Please increase the dynamic range and add more variations in instrumentation to better capture the listener's attention throughout the piece. Consider adding more depth to the composition to enhance the overall emotional impact for film and tv.",
      "label": "B"
    },
    {
      "id": "9318f8b0-a468-4c71-ab25-8ffe19121f6b",
      "timeStart": 61,
      "timeEnd": 70,
      "text": "The BPM seems a bit fast for an intro piece, consider slowing it down for a more relaxed feel. Also, try adding some variation in the melody to keep the listener engaged throughout the piece. Good job overall!",
      "label": "C"
    },
  ],
  "Organica - Performed By Ann Fontanella.mp3": [
    {
      "id": "f28c49a0-d92a-4f5e-a46a-54fcd3db9434",
      "timeStart": 3,
      "timeEnd": 13,
      "text": "The track \"Organica\" by David Mieloch is too long for typical film and TV sync opportunities. Please provide a shorter version for licensing consideration.",
      "label": "A"
    },
    {
      "id": "dec0fb74-e9f9-4435-8d33-edbedc962946",
      "timeStart": 79,
      "timeEnd": 89,
      "text": "The track \"Organica\" needs to be trimmed down to a more manageable length for film and tv placements. Consider shortening it to around 2-3 minutes.",
      "label": "B"
    },
    {
      "id": "92f6c888-4855-4149-b069-7c86fbaf880a",
      "timeStart": 244,
      "timeEnd": 254,
      "text": "The track duration of 7:28 may be too long for use in film and TV. Please consider editing the arrangement to make it more suitable for licensing opportunities.",
      "label": "C"
    },
    {
      "id": "63beaf2c-6a88-4e92-a207-c15e383c1895",
      "timeStart": 332,
      "timeEnd": 352,
      "text": "The violin solo in \"Organica\" is beautiful, but the track feels a bit long at 7:28. Please consider editing it down for better sync opportunities in film and tv.",
      "label": "D"
    },
    {
      "id": "ff0ad4ce-88d0-4030-8b0f-ec2645d7e4a3",
      "timeStart": 355,
      "timeEnd": 365,
      "text": "The track duration of 7:28 is too long for most film and tv scenes. Please consider providing a shorter version for easier sync opportunities. \n\nConsider adding more variety to the composition to keep it engaging for the full duration of the track.",
      "label": "E"
    }
  ],
  "Prj Oblvion Intro Demo.mp3": [
    {
      "id": "38e4396c-d41f-4a5b-b947-a6c5d0536134",
      "timeStart": 0,
      "timeEnd": 15,
      "text": "The intro build-up is too abrupt and could benefit from a smoother transition into the main theme. Consider adding more dynamic layers to enhance the glitch electronic elements and maintain listener engagement throughout the track. Adjust the BPM to better match the pacing of the composition.",
      "label": "A"
    },
    {
      "id": "af1d3552-0cb8-4401-9019-9ba76a51ab11",
      "timeStart": 19,
      "timeEnd": 29,
      "text": "The intro needs to build more suspense and tension to better fit the theme of \"Project Oblivion\". Consider adding darker and more ominous tones to convey a sense of impending doom. Additionally, increase the tempo slightly to enhance the urgency of the scene.",
      "label": "B"
    },
    {
      "id": "89cb9485-3014-46f6-974a-ad19ccaceac0",
      "timeStart": 37,
      "timeEnd": 47,
      "text": "Great job on the glitch electronic vibe for Project Oblivion Intro, David! However, the track could use some more dynamic shifts and development to build tension and keep listeners engaged throughout its 1:17 duration. Consider adding a more defined structure and incorporating different textures to create a more dynamic listening experience.",
      "label": "C"
    },
    {
      "id": "f6d159e7-1748-4cd2-84a0-aa9907b035a2",
      "timeStart": 55,
      "timeEnd": 75,
      "text": "The composition is effective in creating a glitch electronic vibe, but it could benefit from a stronger sense of direction and development throughout the track. Consider adding dynamic shifts or a more defined structure to keep the listener engaged.",
      "label": "D"
    },
  ],
  "Virtue Itself Is Harmony.wav": [
    {
      "id": "07284433-f46b-452e-a1ce-d90cfea41a5f",
      "timeStart": 59,
      "timeEnd": 89,
      "text": "The composition needs to be more dynamic and varied to maintain interest over the 6:45 duration. Consider adding different instrumentation or changes in tempo to enhance the overall listening experience.",
      "label": "A"
    },
    {
      "id": "093216d6-43ad-4fda-9f1e-2fd98219fbcc",
      "timeStart": 162,
      "timeEnd": 172,
      "text": "Great job on capturing the essence of a chamber ensemble with \"Virtue Itself Is Harmony\". Consider adding a more dynamic range in the composition to enhance the overall emotional impact of the track. Additionally, trimming down the duration slightly could make the piece more concise and engaging for film and tv placements.",
      "label": "B"
    },
    {
      "id": "48de5693-b1ff-4de7-8a2c-358d07b74f8b",
      "timeStart": 200,
      "timeEnd": 210,
      "text": "The composition is well crafted and evokes a sense of elegance and refinement suitable for a chamber ensemble. However, consider adding more dynamic contrast and variation in the arrangement to keep the listener engaged throughout the 6:45 duration. Also, ensure the BPM of 110 is consistent and steady throughout the piece.",
      "label": "C"
    },
    {
      "id": "4a747872-cb77-4021-bfd9-61418b246474",
      "timeStart": 221,
      "timeEnd": 251,
      "text": "The track has a strong chamber ensemble sound, but the tempo feels a bit slow for the intended scene. Please consider increasing the BPM to add more energy and momentum.",
      "label": "D"
    },
    {
      "id": "b6a3cccd-a5a9-442a-97ce-38455c3641de",
      "timeStart": 336,
      "timeEnd": 346,
      "text": "The composition is well suited for a chamber ensemble, but consider adding more dynamic contrast to enhance the emotional impact throughout the piece. Additionally, the BPM of 110 feels appropriate, but experiment with slight variations in tempo to add depth and tension to the overall mood.",
      "label": "E"
    }
  ]
}
