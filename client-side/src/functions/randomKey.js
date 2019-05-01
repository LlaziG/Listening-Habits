export default function randomKey(n = 5) {
    return Math.random().toString(36).substring(n);
}
