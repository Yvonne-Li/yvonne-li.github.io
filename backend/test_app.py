import unittest
from unittest.mock import patch, MagicMock
from app import app
import json

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        """Set up test client and other test variables"""
        self.app = app.test_client()
        self.app.testing = True
    
    def test_chat_endpoint_success(self):
        """Test successful chat endpoint request"""
        test_message = "Tell me a joke about programming"
        mock_response = {
            'choices': [{
                'message': {
                    'content': 'Why do programmers prefer dark mode? Because light attracts bugs!'
                }
            }]
        }
        
        # Mock the OpenAI API call
        with patch('openai.ChatCompletion.create') as mock_create:
            mock_create.return_value = mock_response
            
            # Make request to your endpoint
            response = self.app.post('/chat',
                                   data=json.dumps({'message': test_message}),
                                   content_type='application/json')
            
            # Assert response
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode())
            self.assertIn('response', data)
            self.assertEqual(data['response'], 
                           'Why do programmers prefer dark mode? Because light attracts bugs!')
            
            # Verify OpenAI API was called with correct parameters
            mock_create.assert_called_once()
            call_args = mock_create.call_args[1]
            self.assertEqual(call_args['model'], 'gpt-3.5-turbo')
            self.assertEqual(call_args['messages'][1]['content'], test_message)

    def test_chat_endpoint_missing_message(self):
        """Test chat endpoint with missing message field"""
        response = self.app.post('/chat',
                               data=json.dumps({}),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data.decode())
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Message field is missing')

    def test_chat_endpoint_api_error(self):
        """Test chat endpoint when OpenAI API fails"""
        print("\nNote: The following error message is expected as part of the test:")
        with patch('openai.OpenAI') as mock_openai:
            mock_client = MagicMock()
            mock_client.chat.completions.create.side_effect = Exception('API Error')
            mock_openai.return_value = mock_client
            
            response = self.app.post('/chat',
                                data=json.dumps({'message': 'test'}),
                                content_type='application/json')
            
            # Verify error handling works correctly
            self.assertEqual(response.status_code, 500)
            data = json.loads(response.data.decode())
            self.assertIn('error', data)
            print("✓ Error handling test passed successfully!")

if __name__ == '__main__':
    unittest.main()



'''
#run following in terminal in VSCODe
python app.py

#run following in a new terminal in TERMINAL
curl -X POST -H "Content-Type: application/json" -d '{"message":"Tell me a programming joke"}' http://127.0.0.1:5000/chat | python -m json.tool

bundle exec jekyll serve
'''# In another terminal
