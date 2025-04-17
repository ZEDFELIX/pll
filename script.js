document.addEventListener("DOMContentLoaded", function () {
    const storyFeed = document.getElementById("storyFeed");
    const storyContent = document.getElementById("storyContent");
    const submitButton = document.getElementById("submitStory");

    // Generate a unique user ID if not already set
    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = "user_" + new Date().getTime(); // Unique ID based on timestamp
        localStorage.setItem("userId", userId);
    }

    // Load stored stories from local storage
    function loadStories() {
        const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
        storyFeed.innerHTML = ""; // Clear feed before reloading
        savedStories.forEach((story) => {
            addStoryToFeed(story);
        });
    }

    // Add a story to the feed with a delete button (if it's the user's story)
    function addStoryToFeed(story) {
        const storyDiv = document.createElement("div");
        storyDiv.classList.add("story");
        storyDiv.textContent = story.content;

        // If the story belongs to the current user, show the delete button
        if (story.userId === userId) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            deleteButton.onclick = function () {
                deleteStory(story);
            };
            storyDiv.appendChild(deleteButton);
        }

        storyFeed.appendChild(storyDiv);
    }

    // Save a new story
    submitButton.addEventListener("click", function () {
        const content = storyContent.value.trim();
        if (content) {
            let stories = JSON.parse(localStorage.getItem("stories")) || [];
            const newStory = { userId, content };
            stories.push(newStory);
            localStorage.setItem("stories", JSON.stringify(stories));

            addStoryToFeed(newStory);
            storyContent.value = ""; // Clear input after submission
        } else {
            alert("Please write something before submitting.");
        }
    });

    // Delete a story (only by the user who wrote it)
    function deleteStory(storyToDelete) {
        let stories = JSON.parse(localStorage.getItem("stories")) || [];
        stories = stories.filter(story => !(story.userId === storyToDelete.userId && story.content === storyToDelete.content));
        localStorage.setItem("stories", JSON.stringify(stories));
        loadStories(); // Reload stories after deletion
    }

    // Load stories on page load
    loadStories();
});
