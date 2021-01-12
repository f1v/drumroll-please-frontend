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

export const createLoop = async (name: string) => {
  const data = {
    name,
  }
  const response = await fetch(`${DEPLOYED_URL}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newLoop = await response.json()
  return newLoop
}