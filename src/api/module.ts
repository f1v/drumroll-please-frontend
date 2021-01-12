const DEPLOYED_URL = 'https://drumroll-please-api.herokuapp.com'
const LOCAL_URL = 'http://localhost:5000'
const route = 'modules'

declare type UpdateModuleParams = {
  beat_1_1: boolean,
  beat_1_2: boolean,
  beat_1_3: boolean,
  beat_1_4: boolean,
  beat_2_1: boolean,
  beat_2_2: boolean,
  beat_2_3: boolean,
  beat_2_4: boolean,
  beat_3_1: boolean,
  beat_3_2: boolean,
  beat_3_3: boolean,
  beat_3_4: boolean,
  beat_4_1: boolean,
  beat_4_2: boolean,
  beat_4_3: boolean,
  beat_4_4: boolean,
  effects: any,
  id: number,
  instrument: string,
  name: string,
  volume: number,
}

console.log(DEPLOYED_URL)

export const updateModule = async ({
  beat_1_1,
  beat_1_2,
  beat_1_3,
  beat_1_4,
  beat_2_1,
  beat_2_2,
  beat_2_3,
  beat_2_4,
  beat_3_1,
  beat_3_2,
  beat_3_3,
  beat_3_4,
  beat_4_1,
  beat_4_2,
  beat_4_3,
  beat_4_4,
  effects,
  id,
  instrument,
  name,
  volume,
}: UpdateModuleParams) => {
  const response = await fetch(`${DEPLOYED_URL}/${route}/${id}`)
  const updatedModule = await response.json()
  return updatedModule
}