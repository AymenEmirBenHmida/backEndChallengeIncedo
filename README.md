# Artist Search API

This is a Node.js REST API that allows you to search for artists and write the search results to a CSV file. If no results are found, the API will fetch random artist names from a JSON file and attempt to find corresponding artists.

## Features

- Search for artists by name.
- Write search results to a CSV file with a custom filename.
- Handle cases where no results are found by using random artist names from a predefined JSON file.
- Customizable search via URL parameters for artist name and CSV filename.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version >= 14)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AymenEmirBenHmida/backEndChallengeIncedo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd backEndChallengeIncedo
    ```
2. Change into v2 branch:

    ```bash
    git checkout -b v2 remotes/origin/v2
    ```

4. Install dependencies:

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```
5. Set up your environment variables. Make sure to include your API key in a `.env` file, for example:

    ```plaintext
    LASTFM_API_KEY=your_api_key_here
    PORT=3001
    ```
## Running the Application

1. Run the application:

    Using npm:

    ```bash
    npm run dev
    ```

    Using yarn:

    ```bash
    yarn dev
    ```

The API will start running at `http://localhost:3001`.

## API Usage

### Endpoint

**GET** `/api/artist/search`

### Parameters

- `name`: (optional) The name of the artist you want to search for.

If the `name` parameter is missing or no artists are found, the API will use random artist names from a local JSON file to search.

### Example Request

```bash
GET http://localhost:3001/api/artist/search?name=celine
```
### Endpoint

**GET** `/api/artist/download`

### Parameters

- `name`: (optional) The name of the artist you want to search for.
- `fileName`: (required) The name of the CSV file that will be generated.

If the `name` parameter is missing or no artists are found, the API will use random artist names from a local JSON file to search.

### Example Request

```bash
GET http://localhost:3001/api/artist/download?name=celine&fileName=test
