// app/api/donors/route.js
let donors = [
    { id: 1, name: 'John Doe', bloodType: 'A+', location: 'Lagos' },
    { id: 2, name: 'Jane Doe', bloodType: 'B+', location: 'Abuja' }
  ]
  
  export async function GET() {
    return new Response(JSON.stringify(donors), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  
  export async function POST(request) {
    const donor = await request.json()
    donor.id = donors.length + 1
    donors.push(donor)
    return new Response(JSON.stringify(donor), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  