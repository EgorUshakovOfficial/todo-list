export default function formatStatus(input){
    let words = input.split('-').filter(word => word !== '');

    words = words.map((word, index) => {
        if (index === 0){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    });

    const projectStatus = words.join(' ');
    return projectStatus;
}
