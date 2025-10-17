Experimental [Datastar](https://data-star.dev/) JavaScript plugins. See [blog post](https://jasalt.dev/blog/datastar-attribute-plugin/) for more background.

Install by loading plugin script as module after loading Datastar, e.g.

```
<script type="module" src="{% static 'js/datastar.js' %}"></script>
<script type="module" src="{% static 'js/datastar-plugin-textlabel.js' %}"></script>
```

# `data-textlabel` attribute plugin

Attribute that is like `data-text` but resolves the final value from a JS object that defines the per value formatting rules from user's JavaScript code that's run before loading Datastar e.g.

```
const labels = {
    "search": {
        "mode": {
            "music": "Music",
            "sfx": "SFX",
            "all": "All",
        }
    }
}
window.labels = labels;
```

Attribute's usage would be data-textlabel="$search.mode" and resolve the "translated" label value from the `window.labels` object according to the computed value.

Could also be useful for string translations or such with minor modifications. Read the source file for more hints and see Codepen https://codepen.io/jasalt/pen/qEbjwbQ for minimal demo.
