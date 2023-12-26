# auto-api-connector
![Result](https://i.imgur.com/R7JcADw.png)
This is a simple web scraping tool that makes concurrent requests to a target URL and extracts information using Cheerio.

## Prerequisites
- Node.js (v13.2.0 or later, as ECMAScript modules are used)
- npm (Node Package Manager)


## Installation
1. Clone the repository:
```
git clone https://github.com/dante4rt/auto-api-connector.git
```

2. Install dependencies:
```
npm install
```

3. Create a .env file in the root directory and add your target link:
```
TARGET_LINK=https://example.com
```

## Usage
1. Run the tool:
```
npm start
```

2. Enter the number of concurrent requests when prompted.

The tool will make concurrent requests to the target URL, extract information, and display the results.

## Configuration
Adjust the target link in the .env file to point to the desired website.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


