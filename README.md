[Datastar](https://data-star.dev/) JavaScript plugins.

Install by loading plugin script as module after loading Datastar, e.g.

```
<script type="module" src="{% static 'js/datastar.js' %}"></script>
<script type="module" src="{% static 'js/datastar-plugin-textlabel.js' %}"></script>
```

# `data-textlabel` attribute plugin

Like data-text but resolves a "translated" text value from window.labels object set by user. Could also be useful for string translations or such with minor modifications. Read the source file for more hints and see Codepen https://codepen.io/jasalt/pen/qEbjwbQ for minimal demo.
