const Hit_helper = require('../lib/hit-helper');
const assert = require('assert');


describe('Hit_helper', function() {
  describe('#get_most_valuable_content()', function() {
    it('should return something', function() {
      // GIVEN
      hit = {
        _snippetResult: {
          'chapeau-text': {
            value: 'lorem ipsum'
          }
        }
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_most_valuable_content(hit);
      // THEN
      assert.equal(result, hit._snippetResult['chapeau-text'].value);
    });
    it('should not return content if no chapeau text', function() {
      // GIVEN
      hit = {
        _snippetResult: {
          content: {
            value: 'lorem ipsum'
          }
        }
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_most_valuable_content(hit);
      // THEN
      assert.equal(result, hit._snippetResult['content'].value);
    });
    it('should return highlight content if no chapeau highlight', function() {
      // GIVEN
      hit = {
        _snippetResult: {
          'chapeau-text': {
            matchLevel: "none",
            value: 'lorem ipsum'
          },
          content: {
            matchLevel: "full",
            value: 'dolor sit'
          }
        }
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_most_valuable_content(hit);
      // THEN
      assert.equal(result, hit._snippetResult['content'].value);
    });
    it('should return highlight chapeau if no chapeau and content highlight', function() {
      // GIVEN
      hit = {
        _snippetResult: {
          'chapeau-text': {
            matchLevel: "none",
            value: 'lorem ipsum'
          },
          content: {
            matchLevel: "none",
            value: 'dolor sit'
          }
        }
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_most_valuable_content(hit);
      // THEN
      assert.equal(result, hit._snippetResult['chapeau-text'].value);
    });
    it('should return highlight chapeau if no chapeau and content highlight', function() {
      // GIVEN
      hit = {
        content: 'dolor sit',
        _snippetResult: undefined

      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_most_valuable_content(hit);
      // THEN
      assert.equal(result, hit.content);
    });
  });
  describe('#select_image()', function() {
    it('should return the image with image and alternative textuel', function () {
      // GIVEN
      hit = {
        image:
          [{
          image: '/assets/img/test.png',
          alternative_textuelle: 'test'
        }]};
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.select_image('image');
      // THEN
      assert.equal(result.image, '/assets/img/test.png');
      assert.equal(result.alternative_textuelle, 'test');

    });
    it('should return a default image if there is no image', function () {
      // GIVEN
      hit = {
        image: undefined
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.select_image('image');
      // THEN
      assert.equal(result.image, '/assets/img/default.png');
    });
  });
  describe('#get_date()', function() {
    it('should return the coresponding date in french', function () {
      // GIVEN
      hit = {
        date:1530568800
      }
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_date_formated();
      // THEN
      assert.equal(result, '3 juillet 2018');
    });
    it('should return false if there is no date', function () {
      // GIVEN
      hit = {
        date:undefined
      }
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_date_formated();
      // THEN
      assert.equal(result, false);
    });
  });
  describe('#get_first_category()', function() {
    it('should return the first category', function () {
      // GIVEN
      hit = {
        categories:[
          'tulipe',
          'rose'
        ]
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_first_category();
      // THEN
      assert.equal(result, 'tulipe');
    });
    it('should return false if there is no category', function () {
      // GIVEN
      hit = {
        categories:[]
      };
      const hit_helper = new Hit_helper(hit);
      // WHEN
      const result = hit_helper.get_date_formated();
      // THEN
      assert.equal(result, false);
    });
  });
});
