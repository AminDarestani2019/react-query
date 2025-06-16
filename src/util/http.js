    export async function fetchEvents() {  
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/events`);

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    }