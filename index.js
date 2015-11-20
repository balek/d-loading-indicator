module.exports = LoadingIndicator;

var savedState = 0;

function LoadingIndicator() {}

LoadingIndicator.prototype.name = 'd-loading-indicator';
LoadingIndicator.prototype.view = __dirname;

LoadingIndicator.prototype.create = function () {
    var indicator = this.indicator;
    var duration = getComputedStyle(indicator).transitionDuration;
    duration = parseFloat(duration);

    indicator.style.opacity = savedState;
    indicator.style.transitionDuration = savedState * duration + 's';

    this.model.on('change', 'show', function (value) {
        if (value) {
            indicator.style.transitionDuration = '';
            indicator.style.opacity = 1;
            indicator.style.visibility = 'visible';
        } else {
            indicator.style.opacity = 0;
            indicator.style.visibility = 'hidden';
        }
    }.bind(this));
    this.model.set('show', false);
};

LoadingIndicator.prototype.destroy = function () {
    this.model.set('show', true);

    saveState = function() {
        if (this.indicator)
            savedState = getComputedStyle(this.indicator).opacity;
        this.app.removeListener('render', saveState);
    }.bind(this);

    this.app.on('render', saveState);
};