<!--
code from codefreeze.fi/#participants : 
https://github.com/codefreezefi/codefreeze.fi/blob/gh-pages/index.md

Use in Github pages Jekyll site
-->


{{site.participants|size}} Speakers Participants
Register yourself with a pull request to be among the first people to receive details about this unique conference! 
As an alternative, use our registration form (be aware, your personal data will be sent to Google).

{{ participant.name }}
You?
{% for participant in site.participants %} {% assign image_url = "/images/avatar.jpg" | prepend:site.baseurl %} {% if participant.image != null %} {% assign escaped_image = participant.image | uri_escape %} {% assign image_url = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&amp;gadget=a&amp;rewriteMime=image/*&amp;refresh=31536000&amp;resize_w=156&amp;url=" | append:escaped_image %} {% endif %}

{% if participant.link != null %}{% endif %}
{{ participant.name }}
{% if participant.link != null %}{% endif %}
{{ participant.name }} {% if participant.pronouns != null %} ({{ participant.pronouns }}) {% endif %}
{% if participant.link != null %} {% endif %} {% if participant.mastodon != null %} mastodon {% endif %} {% if participant.linkedin != null %} {% endif %} {% if participant.content != null %}
{{ participant.content }}
{% endif %}
{% endfor %}

{% include CodeofConduct.md %}