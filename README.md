# Yii2 toolset for working with Yandex Map (fork kl83)

Widgets list:
- CoordsInput: selection of address on the map;

## Installation
The preferred way to install this extension is through [composer](https://getcomposer.org/).

add to your composer json

```
"nycmic/yii2-ymaps": "@dev"
```

```
  "repositories": [
        {
            "type": "git",
            "url": "https://github.com/nycmic/yii2-ymaps.git"
        }
  ],
```
to the require section of your composer.json file.

## Usage

### CoordsInput

```php
<?= $form->field($model, 'coords')->widget('nycmic\ymaps\CoordsInput', [
  'options' => [], // Html-attributes of container
  'ymapsClientOptions' => [], // Yandex map JS settings
  'placemarkClientProperties' => [], // Placemark JS properties
  'placemarkClientOptions' => [], // Placemark JS options
]) ?>
```
```

## Interactivity

### CoordsInput

Finds the specified address on the map, and moves the placemark to it.

```javascript
$('.widget').coordsInput('search', 'Some address');
```

MIT License
