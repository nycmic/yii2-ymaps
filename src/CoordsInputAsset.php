<?php

namespace nycmic\ymaps;

/**
 * {@inheritdoc}
 */
class CoordsInputAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@vendor/nycmic/yii2-ymaps/web';
    public $js = ['js/coords-input.js'];
    public $css = ['css/coords-input.css'];
    public $depends = [
        'yii\web\JqueryAsset',
        'nycmic\ymaps\YMapsAsset',
    ];
}
