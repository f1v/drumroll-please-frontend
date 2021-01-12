
export const mapIndexToBeatKey = (index: number): string => {
  const indexToBeatKeyMap = [
    'beat_1_1',
    'beat_1_2',
    'beat_1_3',
    'beat_1_4',
    'beat_2_1',
    'beat_2_2',
    'beat_2_3',
    'beat_2_4',
    'beat_3_1',
    'beat_3_2',
    'beat_3_3',
    'beat_3_4',
    'beat_4_1',
    'beat_4_2',
    'beat_4_3',
    'beat_4_4'
  ]
  return indexToBeatKeyMap[index]
}

export const mapBeatKeyToIndex = (beatKey: string): number => {
  const beatKeyToIndexMap = {
    beat_1_1: 0,
    beat_1_2: 1,
    beat_1_3: 2,
    beat_1_4: 3,
    beat_2_1: 4,
    beat_2_2: 5,
    beat_2_3: 6,
    beat_2_4: 7,
    beat_3_1: 8,
    beat_3_2: 9,
    beat_3_3: 10,
    beat_3_4: 11,
    beat_4_1: 12,
    beat_4_2: 13,
    beat_4_3: 14,
    beat_4_4: 15,
  }
  // @ts-ignore
  return beatKeyToIndexMap[beatKey]
}