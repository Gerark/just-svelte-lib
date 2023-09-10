<script>
    import TreeViewMenu from "../lib/components/UTreeView/TreeViewMenu.svelte"
    import {writable} from "svelte/store";
    import TreeView from "../lib/components/UTreeView/TreeView.svelte";

    let array = [
        {
            "id": 0,
            "label": "HTML",
            "items": [
                {
                    "id": 8,
                    "label": "HTML Basics",
                    "items": [
                        {
                            "id": 16,
                            "label": "HTML Tags",
                            "description": "This covers basic HTML tags."
                        },
                        {
                            "id": 17,
                            "label": "HTML Structure",
                            "description": "This explains the structure of an HTML document."
                        }
                    ]
                },
                {
                    "id": 9,
                    "label": "HTML Forms",
                    "items": [
                        {
                            "id": 18,
                            "label": "Form Elements",
                            "description": "This covers HTML form elements."
                        }
                    ]
                }
            ]
        },
        {
            "id": 1,
            "label": "CSS",
            "items": [
                {
                    "id": 10,
                    "label": "CSS Basics",
                    "items": [
                        {
                            "id": 19,
                            "label": "Selectors",
                            "description": "This explains CSS selectors."
                        },
                        {
                            "id": 20,
                            "label": "Properties",
                            "description": "This covers CSS properties."
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "label": "JavaScript",
            "items": [
                {
                    "id": 11,
                    "label": "JavaScript Basics",
                    "items": [
                        {
                            "id": 21,
                            "label": "Variables",
                            "description": "This covers JavaScript variables."
                        },
                        {
                            "id": 22,
                            "label": "Functions",
                            "description": "This explains JavaScript functions."
                        }
                    ]
                },
                {
                    "id": 12,
                    "label": "JavaScript DOM",
                    "items": [
                        {
                            "id": 23,
                            "label": "DOM Manipulation",
                            "description": "This covers manipulating the Document Object Model with JavaScript."
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "label": "Responsive Design",
            "items": [
                {
                    "id": 13,
                    "label": "Media Queries",
                    "description": "This explains CSS media queries for responsive design."
                },
                {
                    "id": 14,
                    "label": "Flexbox",
                    "description": "This covers CSS Flexbox layout."
                },
                {
                    "id": 15,
                    "label": "Grid Layout",
                    "description": "This covers CSS Grid layout for responsive design.",
                    "items": [
                        {
                            "id": 13,
                            "label": "Media Queries",
                            "description": "This explains CSS media queries for responsive design."
                        },
                        {
                            "id": 14,
                            "label": "Flexbox",
                            "description": "This covers CSS Flexbox layout."
                        },
                        {
                            "id": 15,
                            "label": "Grid Layout",
                            "description": "This covers CSS Grid layout for responsive design.",
                            "items": [
                                {
                                    "id": 13,
                                    "label": "Media Queries",
                                    "description": "This explains CSS media queries for responsive design."
                                },
                                {
                                    "id": 14,
                                    "label": "Flexbox",
                                    "description": "This covers CSS Flexbox layout."
                                },
                                {
                                    "id": 15,
                                    "label": "Grid Layout",
                                    "description": "This covers CSS Grid layout for responsive design."
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    let itemsStore = writable(array);
    let items = array;
</script>

<div class="mainContainer">
    TreeViewMenu Component
    <div class="treeview-container">
        <TreeViewMenu
                descriptionText="Expand a Folder to see the available Actions"
                itemsStore="{itemsStore}"
                showDescription="{true}"
                theme="u"
                title="Test TreeViewMenu"></TreeViewMenu>
    </div>
    <div class="treeview-container">
        TreeView Component
        <TreeView appendItemsCount="{false}" items="{items}" showDescription="{false}" theme="u"></TreeView>
    </div>
</div>

<style lang="scss">
  .treeview-container {
    width: 300px;
    height: 300px;
  }

  .mainContainer {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }
</style>