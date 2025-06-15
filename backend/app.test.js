const request = require('supertest');
const app = require('./app.js');

describe('Basic API tests', () => {
  //health check
  it('should respond to /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  //list all events
  it('should return all events from /events', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('events');
    expect(Array.isArray(res.body.events)).toBe(true);
  });

  //get test
  it('should return 404 for non-existing event', async () => {
    const res = await request(app).get('/events/unknown-id-1234');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/no event could be found/i);
  });

  //post test
  it('POST /events should add new event', async () => {
  const newEvent = {
    event: {
      title: 'Test event',
      description: 'Test description',
      date: '2025-06-20',
      time: '10:00',
      image: 'test.jpg',
      location: 'Test Location',
    }
  };

  const res = await request(app)
    .post('/events')
    .send(newEvent)
    .set('Accept', 'application/json');

  expect(res.statusCode).toBe(200);
  expect(res.body.event).toHaveProperty('id');
  expect(res.body.event.title).toBe(newEvent.event.title);
});

//put test
it('PUT /events/:id should update an existing event', async () => {
  const updatedEvent = {
    event: {
      title: 'Updated event',
      description: 'Updated description',
      date: '2025-07-01',
      time: '15:00',
      image: 'updated.jpg',
      location: 'Updated Location',
    }
  };

  const eventId = 'e1';  // یک آیدی که توی data/events.json موجوده یا توی تست‌های قبلی ساختی

  const res = await request(app)
    .put(`/events/${eventId}`)
    .send(updatedEvent)
    .set('Accept', 'application/json');

  expect(res.statusCode).toBe(200);
  expect(res.body.event).toHaveProperty('id', eventId);
  expect(res.body.event.title).toBe(updatedEvent.event.title);
});


});