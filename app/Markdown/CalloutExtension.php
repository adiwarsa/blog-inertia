<?php
namespace App\Markdown;

use League\CommonMark\Environment\EnvironmentBuilderInterface;
use League\CommonMark\Extension\CommonMark\Node\Block\BlockQuote;
use League\CommonMark\Extension\CommonMark\Node\Inline\Strong;
use League\CommonMark\Extension\ExtensionInterface;
use League\CommonMark\Node\Block\Paragraph;
use League\CommonMark\Node\Inline\Text;
use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;
use League\CommonMark\Util\HtmlElement;

class CalloutExtension implements ExtensionInterface, NodeRendererInterface
{
    protected array $calloutTypes = [
        'note' => [
            'img' => '/callouts/info.svg',
            'color' => 'bg-sky-950/50 ring-sky-500/40 border-sky-600',
        ],
        'warning' => [
            'img' => '/callouts/warning.svg',
            'color' => 'bg-orange-800/50 ring-orange-500/40 border-orange-400',
        ],
    ];

    public function register(EnvironmentBuilderInterface $environment): void
    {
        $environment->addRenderer(BlockQuote::class, $this, 10);
    }

    public function render(Node $node, ChildNodeRendererInterface $childRenderer)
    {
        assert($node instanceof BlockQuote);

        $calloutTypeNode = $this->calloutTypeNode($node);

        if (! $calloutTypeNode) {
            return null;
        }

        $type = $this->calloutType($calloutTypeNode);

        if (! $type) {
            return null;
        }

        $calloutTypeNode->detach();

        return new HtmlElement(
            'div',
            ['class' => 'mb-6 max-w-2xl p-6 lg:flex lg:items-center bg-gray-800/50 rounded-lg lg:rounded-xl'],
            [
                new HtmlElement(
                    'div',
                    ['class' => "w-12 h-12 p-2 rounded-full ring mb-6 border flex items-center justify-center shrink-0 {$this->calloutTypes[$type]['color']} lg:mb-0"],
                    new HtmlElement(
                        'img',
                        [
                            'src' => $this->calloutTypes[$type]['img'],
                            'class' => 'w-6 h-6',
                        ],
                    )
                ),
                new HtmlElement(
                    'div',
                    ['class' => 'lg:ml-6 prose-p:m-0'],
                    $childRenderer->renderNodes($node->children())
                ),
            ]
        );
    }

    protected function calloutTypeNode(BlockQuote $blockQuote): ?Strong
    {
        $child = $blockQuote->firstChild();

        if (! $child instanceof Paragraph) {
            return null;
        }

        $child = $child->firstChild();

        return $child instanceof Strong ? $child : null;
    }

    protected function calloutType(Strong $node): ?string
    {
        $child = $node->firstChild();

        if (! $child instanceof Text) {
            return null;
        }

        $type = strtolower($child->getLiteral());

        return in_array($type, array_keys($this->calloutTypes)) ? $type : null;
    }
}