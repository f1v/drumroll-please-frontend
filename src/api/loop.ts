const DEPLOYED_URL = 'https://drumroll-please-api.herokuapp.com'
const LOCAL_URL = 'http://localhost:5000'
const route = 'loops'

export const getAllLoops = async () => {
  const response = await fetch(`${DEPLOYED_URL}/${route}`)
  const allLoops = await response.json()
  return allLoops
}

export const getLoopSequence = async (id: number) => {
  const response = await fetch(`${DEPLOYED_URL}/${route}/${id}`)
  const loopSequence = await response.json()
  return loopSequence
}