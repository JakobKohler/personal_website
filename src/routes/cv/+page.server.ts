export async function load({ fetch }) {

    const response = await fetch('/cv.json');
1
    const cv = await response.json();

    return {
        cv
    };
}