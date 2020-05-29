function generateMarkdown(response) {
    let output = '';

    for (property in response) {
        console.log(`key= ${property} value = ${response[property]}`);

        let mode_str = '';
        switch (property) {
            case 'title':
                mode_str = '#';
                break;
            case 'description':
                mode_str = '1.';
                break;
            default:
                mode_str = '';
        }

        output += `${mode_str} ${property.capitalize()}: ${response[property]}\n\n`
    }

    return output;

    //     return `
    //   # ${data.title}

    //   `;
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = generateMarkdown;