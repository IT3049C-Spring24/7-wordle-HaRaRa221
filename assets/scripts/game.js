async function isWordValid(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.length > 0;
    } catch (error) {
        console.error('Error fetching data', error);
        return false;
    }
}