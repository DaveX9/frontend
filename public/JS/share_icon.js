document.getElementById('share-icon').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior

    if (navigator.share) {
        navigator.share({
            title: 'Check this out!',
            text: 'Visit T. Home Inspector for amazing services!',
            url: 'https://www.yourwebsite.com'
        })
        .then(() => console.log('Share successful!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        alert('Your browser does not support the Web Share API.');
    }
});