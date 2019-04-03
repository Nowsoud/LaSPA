<template>
  <div id="app">
    <NavBar/>
    <SnippetViewer :snippets="snippets"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SnippetViewer from "./components/SnippetViewer.vue";

export default {
  name: "app",
  components: {
    NavBar,
    SnippetViewer
  },
  data() {
    return {
      snippets: [
        {
          snippet_theme: "Saying No",
          snippets_count: 3,
          snippets: [
            {
              snippet_description:
                "Turning Down a Meeting While Asking to Reschedule",
              snippet_text: `Hi [Name],

Thanks for sending the meeting invite over. Based on my current schedule, I won’t be available on [insert date here] at the time you’ve carved out, but I am free on any of the dates/times below if one of these works on your end.

[option 1: insert date and time]
[option 2: insert date and time]
[option 3: insert date and time]

Please let me know which date works best for you and I’ll get it on the calendar!`
            },
            {
              snippet_description:
                "Turning Down a Meeting While Asking for Action Items",
              snippet_text: `Hi [Name],

Thanks for sending that meeting invite. Unfortunately, I’m not able to attend because of prior scheduling—but please keep me updated with action items I may be able to help with. You can feel free to send those notes over after the meeting, though I won’t be available right away.`
            },
            {
              snippet_description: "A Vendor You Don’t Want to Work With",
              snippet_text: `Hey [Name],

Thank you for all the help you’ve given up to this point! We’ve decided to go in another direction, but will keep [company] in mind for future partnerships that could work out better.

Much appreciated,`
            }
          ]
        },
        {
          snippet_theme: "Greetings",
          snippets_count: 3,
          snippets: [
            {
              snippet_description:
                "Official greeting when you don't know name of receiver",
              snippet_text: `Dear Sir/Madam,`
            },
            {
              snippet_description:
                "Official greeting when you don't know name of receiver",
              snippet_text: `To Whom It May Concern,`
            },
            {
              snippet_description:
                "Official greeting when you know name of receiver",
              snippet_text: `Dear [Name],`
            }
          ]
        }
      ]
    };
  }
};
</script>
