<script>
    import TreeViewMenu from "$lib/components/TreeViewMenu/TreeViewMenu.svelte"
    import {writable} from "svelte/store";
    import TreeView from "$lib/components/TreeView/TreeView.svelte";
    import EditableList from "../lib/components/EditableList/EditableList.svelte";
    import Select from "$lib/components/Select/Select.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Theme from "$lib/components/Theme/Theme.svelte";
    import {createDefaultThemes} from "$lib/styles/createTheme.js";
    import Background from "$lib/components/Background/Background.svelte";
    import ButtonIcon from "$lib/components/Buttons/ButtonIcon.svelte";

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

    let allThemes = createDefaultThemes();
    let currentTheme = allThemes[0].value;
</script>

<div class="overlay">
    <Theme theme="{currentTheme}">
        <Background>
            <div class="content">
                <div class="mainContainer">
                    <div class="themeProperty">
                        <Label text="THEME: "></Label>
                        <Select bind:value="{currentTheme}" items="{allThemes}"/>
                        <ButtonIcon icon="trash" size="s"></ButtonIcon>
                    </div>

                    <div class="treeview-container">
                        <TreeViewMenu
                                descriptionText="Expand a Folder to see the available items"
                                itemsStore="{itemsStore}"
                                showDescription="{true}"
                                theme="{currentTheme.id}"
                                title="Test TreeViewMenu"></TreeViewMenu>
                    </div>

                    <div class="treeview-container">
                        <TreeView appendItemsCount="{false}" items="{items}" showDescription="{false}"
                                  theme="{currentTheme.id}"></TreeView>
                    </div>

                    <div class="treeview-container">
                        <EditableList items="{array}" let:item title="Editable List">
                            <div>{item.label}</div>
                        </EditableList>
                    </div>
                </div>
            </div>
        </Background>
    </Theme>
</div>

<style lang="scss">
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .content {
    padding: 10px;
  }

  .treeview-container {
    width: 300px;
    height: 300px;
  }

  .themeProperty {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 5px;
    width: 300px;
  }

  .mainContainer {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }
</style>